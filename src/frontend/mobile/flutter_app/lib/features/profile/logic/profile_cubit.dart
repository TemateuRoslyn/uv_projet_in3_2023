import 'package:bloc/bloc.dart';
import 'package:dio/dio.dart';
import 'package:fltter_app/common/configurations/api_configuration.dart';
import 'package:fltter_app/common/logics/speech/speech_cubit.dart';
import 'package:fltter_app/common/utils/enums.dart';
import 'package:fltter_app/repositories/auth_repository.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import '../../../common/logics/internet/internet_cubit.dart';
import '../../../common/models/user.dart';

part 'profile_state.dart';
part 'profile_cubit.freezed.dart';

class ProfileCubit extends Cubit<ProfileState> {
  ProfileCubit({
    required this.authRepository,
    required this.internetCubit,
    required this.speechCubit,
    // ignore: prefer_const_constructors
  }) : super(ProfileState());

  final AuthRepository authRepository;
  final InternetCubit internetCubit;
  final SpeechCubit speechCubit;

  Future<void> getCurrentUser() async {
    emit(state.copyWith(status: ApiStatus.isLoading));
    final isOnline = await internetCubit.checkInternetConnection();

    if (isOnline) {
      proceedTogetCurrentUser();
    } else {
      emit(state.copyWith(
          currentUser: null,
          status: ApiStatus.failed,
          statusMessage:
              'Veuillez consulter votre connexion internet. Cliquez pour recharger une fois la connection retablie.'));
    }
  }

  Future<void> proceedTogetCurrentUser() async {
    try {
      final userFound = await authRepository.getCurrentUser();
      emit(state.copyWith(status: ApiStatus.success, currentUser: userFound));
      // speechCubit.startSpeeching(
      //     // text:
      //     //     'vous avez deux enfants, ${userFound.childrenAndThierClasses![0]['child'].firstName} et ${userFound.childrenAndThierClasses![1]['child'].lastName}'
      //     );
    } on DioException catch (e) {
      final errorMessage = ApiConfiguration.getErrorMessage(e);
      emit(state.copyWith(
          currentUser: null,
          status: ApiStatus.failed,
          statusMessage: errorMessage));
    }
  }
}

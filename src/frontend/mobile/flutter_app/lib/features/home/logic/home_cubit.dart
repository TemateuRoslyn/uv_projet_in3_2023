import 'package:bloc/bloc.dart';
import 'package:dio/dio.dart';
import 'package:fltter_app/common/logics/internet/internet_cubit.dart';
import 'package:fltter_app/common/models/reglements_interieurs.dart';
import 'package:fltter_app/common/utils/enums.dart';
import 'package:fltter_app/repositories/home_repository.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

import '../../../common/configurations/api_configuration.dart';

part 'home_state.dart';
part 'home_cubit.freezed.dart';

class HomeCubit extends Cubit<HomeState> {
  HomeCubit({
    required this.homeRepository,
    required this.internetCubit,
    // ignore: prefer_const_constructors
  }) : super(HomeState());

  final HomeRepository homeRepository;
  final InternetCubit internetCubit;

  Future<void> getAllReglementInterieur() async {
    emit(state.copyWith(riStatus: ApiStatus.isLoading));
    final isOnline = await internetCubit.checkInternetConnection();

    if (isOnline) {
      proceedTogetAllReglementInterieur();
    } else {
      emit(state.copyWith(
          ri: [],
          riStatus: ApiStatus.failed,
          riStatusMessage:
              'Veuillez consulter votre connexion internet. Cliquez pour recharger une fois la connection retablie.'));
    }
  }

  void proceedTogetAllReglementInterieur() async {
    try {
      final ri = await homeRepository.getAllReglementInterieur();
      emit(state.copyWith(riStatus: ApiStatus.success, ri: ri));
    } on DioException catch (e) {
      final errorMessage = ApiConfiguration.getErrorMessage(e);
      emit(state.copyWith(
          ri: [], riStatus: ApiStatus.failed, riStatusMessage: errorMessage));
    }
  }
}

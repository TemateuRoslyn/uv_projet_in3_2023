import 'package:bloc/bloc.dart';
import 'package:dio/dio.dart';
import 'package:fltter_app/common/logics/internet/internet_cubit.dart';
import 'package:fltter_app/common/models/reglement_interieur.dart';
import 'package:fltter_app/common/utils/enums.dart';
import 'package:fltter_app/repositories/home_repository.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

import '../../../common/configurations/api_configuration.dart';
import '../../../common/models/faute.dart';

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

  void getDataByType(String dataType) async {
    // ri = reglements interierieurs
    // fs = fautes et sanctions
    final isOnline = await internetCubit.checkInternetConnection();
    switch (dataType) {
      case 'ri':
        {
          emit(state.copyWith(riStatus: ApiStatus.isLoading));
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
        break;
      case 'fautes':
        {
          emit(state.copyWith(fauteStatus: ApiStatus.isLoading));
          if (isOnline) {
            proceedTogetAllUserFautes();
          } else {
            emit(state.copyWith(
                fautes: [],
                fauteStatus: ApiStatus.failed,
                fauteStatusMessage:
                    'Veuillez consulter votre connexion internet. Cliquez pour recharger une fois la connection retablie.'));
          }
        }
        break;
      default:
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

  void proceedTogetAllUserFautes() async {
    try {
      final fautes = await homeRepository.getAllUserFautes();
      emit(state.copyWith(fauteStatus: ApiStatus.success, fautes: fautes));
    } on DioException catch (e) {
      final errorMessage = ApiConfiguration.getErrorMessage(e);
      emit(state.copyWith(
          fautes: [],
          fauteStatus: ApiStatus.failed,
          fauteStatusMessage: errorMessage));
    }
  }
}

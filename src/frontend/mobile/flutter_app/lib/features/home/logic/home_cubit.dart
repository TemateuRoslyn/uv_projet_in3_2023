import 'package:bloc/bloc.dart';
import 'package:dio/dio.dart';
import 'package:fltter_app/common/logics/internet/internet_cubit.dart';
import 'package:fltter_app/common/models/reglement_interieur.dart';
import 'package:fltter_app/common/utils/enums.dart';
import 'package:fltter_app/repositories/home_repository.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

import '../../../common/configurations/api_configuration.dart';
import '../../../common/models/conseil_discipline.dart';
import '../../../common/models/convocation.dart';
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
    // cd = conseil discipline
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
      case 'cd':
        {
          emit(state.copyWith(cdStatus: ApiStatus.isLoading));
          if (isOnline) {
            proceedTogetAllUserCD();
          } else {
            emit(state.copyWith(
                cds: [],
                cdStatus: ApiStatus.failed,
                cdStatusMessage:
                    'Veuillez consulter votre connexion internet. Cliquez pour recharger une fois la connection retablie.'));
          }
        }
        break;
      case 'convocations':
        {
          emit(state.copyWith(convocationStatus: ApiStatus.isLoading));
          if (isOnline) {
            proceedTogetAllUserConvocation();
          } else {
            emit(state.copyWith(
                convocations: [],
                convocationStatus: ApiStatus.failed,
                convocationStatusMessage:
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

  void proceedTogetAllUserCD() async {
    try {
      final cds = await homeRepository.getAllUserCD();
      emit(state.copyWith(cdStatus: ApiStatus.success, cds: cds));
    } on DioException catch (e) {
      final errorMessage = ApiConfiguration.getErrorMessage(e);
      emit(state.copyWith(
          cds: [], cdStatus: ApiStatus.failed, cdStatusMessage: errorMessage));
    }
  }

  void proceedTogetAllUserConvocation() async {
    try {
      final convocations = await homeRepository.getAllUserConvocations();
      emit(state.copyWith(
          convocationStatus: ApiStatus.success, convocations: convocations));
    } on DioException catch (e) {
      final errorMessage = ApiConfiguration.getErrorMessage(e);
      emit(state.copyWith(
          convocations: [],
          convocationStatus: ApiStatus.failed,
          convocationStatusMessage: errorMessage));
    }
  }
}

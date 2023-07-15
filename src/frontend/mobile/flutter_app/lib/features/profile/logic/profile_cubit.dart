import 'package:bloc/bloc.dart';
import 'package:dio/dio.dart';
import 'package:fltter_app/common/configurations/api_configuration.dart';
import 'package:fltter_app/common/services/pusher_service.dart';
import 'package:fltter_app/common/utils/enums.dart';
import 'package:fltter_app/repositories/auth_repository.dart';
import 'package:flutter/material.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import '../../../common/logics/internet/internet_cubit.dart';
import '../../../common/models/user.dart';

part 'profile_state.dart';
part 'profile_cubit.freezed.dart';

class ProfileCubit extends Cubit<ProfileState> {
  ProfileCubit({
    this.authRepository,
    this.internetCubit,
    // this.speechCubit,
    // ignore: prefer_const_constructors
  }) : super(ProfileState());

  final AuthRepository? authRepository;
  final InternetCubit? internetCubit;
  // final SpeechCubit? speechCubit;

  Future<void> getCurrentUser({VoidCallback? callback}) async {
    emit(state.copyWith(status: ApiStatus.isLoading));
    final isOnline = await internetCubit!.checkInternetConnection();

    if (isOnline) {
      proceedTogetCurrentUser(callback: callback);
    } else {
      emit(state.copyWith(
          currentUser: null,
          status: ApiStatus.failed,
          statusMessage:
              'Veuillez consulter votre connexion internet. Cliquez pour recharger une fois la connection retablie.'));
    }
  }

  Future<void> proceedTogetCurrentUser({VoidCallback? callback}) async {
    try {
      final currentUserType = AuthRepository.getUserType;
      var textToSpeech = '';

      final userFound = await authRepository!.getCurrentUser();

      Future.wait([
        PusherService.subscribeToSpecificChannel('faute', 'faute-created'),
        PusherService.subscribeToSpecificChannel(
            'sanction', 'sanction-created'),
        PusherService.subscribeToSpecificChannel(
            'conseil-discipline', 'conseil-discipline-created'),
        PusherService.subscribeToSpecificChannel(
            'convocation', 'convocation-created'),
      ]);

      if (currentUserType == 'parents' &&
          userFound.childrenAndThierClasses!.isNotEmpty) {
        // var textToSpeech = '';
        final children = userFound.childrenAndThierClasses!;
        for (var child in children) {
          final voiceText = await authRepository!
              .getChildrenInfosForVoice((child['child'] as User).id);
          textToSpeech = textToSpeech + voiceText;
        }
      }

      emit(state.copyWith(
        status: ApiStatus.success,
        currentUser: userFound,
        textToSpeech: textToSpeech,
      ));

      if (currentUserType == 'parents') callback!();
    } on DioException catch (e) {
      final errorMessage = ApiConfiguration.getErrorMessage(e);
      emit(state.copyWith(
          currentUser: null,
          status: ApiStatus.failed,
          statusMessage: errorMessage));
    }
  }

  Future<void> logOut() async {
    await authRepository!.logOut();
  }
}

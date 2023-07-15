import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';

import '../../../../../repositories/auth_repository.dart';

part 'authentication_event.dart';
part 'authentication_state.dart';

class AuthenticationBloc
    extends Bloc<AuthenticationEvent, AuthenticationState> {
  AuthenticationBloc({
    required AuthRepository authRepository,
  })  : _authRepository = authRepository,
        super(const UnknownAuthenticationState(status: AuthStatus.unknown)) {
    on<AuthenticationStatusChange>(_onAuthenticationStatusChange);
    on<AuthenticationLogOutrequest>(_onAuthenticationLogOutrequest);

    _authenticationStatusSubscription =
        authRepository.getStatus().listen((status) {
      add(AuthenticationStatusChange(status: status));
    });
  }

  final AuthRepository _authRepository;
  late StreamSubscription<AuthStatus> _authenticationStatusSubscription;

  void _onAuthenticationStatusChange(
    AuthenticationStatusChange event,
    Emitter<AuthenticationState> emit,
  ) {
    switch (event.status) {
      case AuthStatus.unAuthenticated:
        // ignore: prefer_const_constructors
        return emit(IsUnAuthenticated(status: AuthStatus.unAuthenticated));
      case AuthStatus.authenticated:
        // ignore: prefer_const_constructors
        return emit(IsAuthenticated(status: AuthStatus.authenticated));
      default:
        // ignore: prefer_const_constructors
        return emit(IsUnAuthenticated(status: AuthStatus.unAuthenticated));
    }
  }

  void _onAuthenticationLogOutrequest(_, __) async {
    _authRepository.logOut();
  }

  @override
  Future<void> close() {
    _authenticationStatusSubscription.cancel();
    _authRepository.dispose();
    return super.close();
  }
}

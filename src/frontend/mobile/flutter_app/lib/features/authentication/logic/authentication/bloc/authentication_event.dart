part of 'authentication_bloc.dart';

@immutable
abstract class AuthenticationEvent extends Equatable {
  const AuthenticationEvent();

  @override
  List<Object?> get props => [];
}

class AuthenticationStatusChange extends AuthenticationEvent {
  const AuthenticationStatusChange({
    required this.status,
  });

  final AuthStatus status;

  @override
  List<Object?> get props => [status];
}

class AuthenticationLogOutrequest extends AuthenticationEvent {}

part of 'authentication_bloc.dart';

@immutable
abstract class AuthenticationState extends Equatable {
  const AuthenticationState({
    required this.status,
  });

  final AuthStatus status;

  @override
  List<Object?> get props => [status];
}

class IsUnAuthenticated extends AuthenticationState {
  const IsUnAuthenticated({
    required this.status,
  }) : super(status: AuthStatus.unknown);

  final AuthStatus status;

  @override
  List<Object?> get props => [status];
}

class IsAuthenticated extends AuthenticationState {
  const IsAuthenticated({
    required this.status,
  }) : super(status: AuthStatus.unknown);

  final AuthStatus status;

  @override
  List<Object?> get props => [status];
}

class UnknownAuthenticationState extends AuthenticationState {
  const UnknownAuthenticationState({
    required this.status,
  }) : super(status: AuthStatus.unknown);

  final AuthStatus status;

  @override
  List<Object?> get props => [status];
}

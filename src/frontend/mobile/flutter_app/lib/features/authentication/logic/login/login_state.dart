part of 'login_cubit.dart';

@freezed
class LoginState with _$LoginState {
  const factory LoginState({
    @Default('') String emial,
    @Default('') String password,
    @Default('') String statusMessage,
    @Default(ApiStatus.init) ApiStatus loginStatus,
  }) = _Initial;
}

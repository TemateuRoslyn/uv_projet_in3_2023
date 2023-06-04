part of 'profile_cubit.dart';

@freezed
class ProfileState with _$ProfileState {
  const factory ProfileState({
    @Default(null) User? currentUser,
    @Default(ApiStatus.init) ApiStatus status,
    @Default('') String statusMessage,
  }) = _Initial;
}

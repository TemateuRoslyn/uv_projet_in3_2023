part of 'profile_cubit.dart';

@freezed
class ProfileState with _$ProfileState {
  const factory ProfileState({
    @Default(null) User? currentUser,
    @Default(ApiStatus.init) ApiStatus status,
    @Default('') String statusMessage,
    @Default('') String textToSpeech, //only for user of type parent
  }) = _Initial;
}

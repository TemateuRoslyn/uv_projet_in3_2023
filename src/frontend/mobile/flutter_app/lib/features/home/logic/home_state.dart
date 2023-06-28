part of 'home_cubit.dart';

@freezed
class HomeState with _$HomeState {
  const factory HomeState({
    @Default(ApiStatus.init) ApiStatus riStatus,
    @Default([]) List<ReglementInterieur> ri,
    @Default('') String riStatusMessage,
  }) = _Initial;
}

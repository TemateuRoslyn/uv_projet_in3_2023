part of 'home_cubit.dart';

@freezed
class HomeState with _$HomeState {
  const factory HomeState({
    // reglement interieur variables
    @Default(ApiStatus.init) ApiStatus riStatus,
    @Default([]) List<ReglementInterieur> ri,
    @Default('') String riStatusMessage,

    // fautes variables
    @Default(ApiStatus.init) ApiStatus fauteStatus,
    @Default([]) List<Faute> fautes,
    @Default('') String fauteStatusMessage,
  }) = _Initial;
}

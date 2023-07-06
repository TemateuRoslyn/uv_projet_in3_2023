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

    // conseil discipline variables
    @Default(ApiStatus.init) ApiStatus cdStatus,
    @Default([]) List<ConseilDiscipline> cds,
    @Default('') String cdStatusMessage,

    // covocations variables
    @Default(ApiStatus.init) ApiStatus convocationStatus,
    @Default([]) List<Convocation> convocations,
    @Default('') String convocationStatusMessage,

    //Box suggession variables
    @Default('') String suggestionInsertStatus,
    // parent consultation variables
    @Default(ApiStatus.init) ApiStatus parentConsultationStatus,
    @Default('') String parentConsultationStatusMessage,
  }) = _Initial;
}

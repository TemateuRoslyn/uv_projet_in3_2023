part of 'navigation_cubit.dart';

@freezed
class NavigationState with _$NavigationState {
  const factory NavigationState({
    @Default(NavigationType.home) NavigationType navigationType,
  }) = _Initial;
}

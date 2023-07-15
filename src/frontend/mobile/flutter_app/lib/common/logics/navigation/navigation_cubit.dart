import 'package:bloc/bloc.dart';
import 'package:fltter_app/common/utils/enums.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'navigation_state.dart';

part 'navigation_cubit.freezed.dart';

class NavigationCubit extends Cubit<NavigationState> {
  // ignore: prefer_const_constructors
  NavigationCubit() : super(NavigationState());

  void changeNavigationType(NavigationType newNavigationType) =>
      emit(state.copyWith(navigationType: newNavigationType));

  void clearState() =>
      emit(state.copyWith(navigationType: NavigationType.init));
}

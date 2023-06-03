import 'dart:developer';

import 'package:flutter_bloc/flutter_bloc.dart';

class AppBlocObserver extends BlocObserver {
  @override
  void onCreate(BlocBase bloc) {
    log('onCreate:  $bloc');
    super.onCreate(bloc);
  }

  @override
  void onChange(BlocBase bloc, Change change) {
    log('onChange:  bloc: $bloc ... chnage: $change');
    super.onChange(bloc, change);
  }

  // @override
  // void onEvent(Bloc bloc, Object? event) {
  //   log('onEven: $bloc ... event: $event');
  //   super.onEvent(bloc, event);
  // }

  @override
  void onClose(BlocBase bloc) {
    log('onClose: $bloc');
    super.onClose(bloc);
  }

  @override
  void onError(BlocBase bloc, Object error, StackTrace stackTrace) {
    log('onError:  bloc: $bloc ... error: $error ... stackTrace: $stackTrace');
    super.onError(bloc, error, stackTrace);
  }

  @override
  void onTransition(Bloc bloc, Transition transition) {
    log('onTransition: $bloc ... transiton: $transition');
    super.onTransition(bloc, transition);
  }
}

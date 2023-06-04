import 'dart:developer';

import 'package:fltter_app/app/app_bloc_observer.dart';
import 'package:fltter_app/common/logics/navigation/cubit/navigation_cubit.dart';
import 'package:fltter_app/common/views/onBoarding_one.dart';
import 'package:fltter_app/common/views/page_skeleton.dart';
import 'package:fltter_app/common/views/splash_page.dart';
import 'package:fltter_app/features/authentication/views/login_page.dart';
import 'package:fltter_app/repositories/auth_repository.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'common/configurations/routes.dart';
import 'features/authentication/logic/authentication/bloc/authentication_bloc.dart';
import 'features/authentication/logic/login/login_cubit.dart';

void main() {
  Bloc.observer = AppBlocObserver();

  runApp(MyApp(
    authRepository: AuthRepository(),
  ));
}

class MyApp extends StatefulWidget {
  const MyApp({required this.authRepository, super.key});

  final AuthRepository authRepository;

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final navigatorKey = GlobalKey<NavigatorState>();
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MultiRepositoryProvider(
      providers: [
        RepositoryProvider<AuthRepository>(
          create: ((context) => AuthRepository()),
        ),
      ],
      child: MultiBlocProvider(
        providers: [
          BlocProvider<AuthenticationBloc>(
            create: (context) =>
                AuthenticationBloc(authRepository: widget.authRepository),
          ),
          BlocProvider<LoginCubit>(
            create: (context) =>
                LoginCubit(authRepository: widget.authRepository),
          ),
          BlocProvider<NavigationCubit>(
            create: (context) => NavigationCubit(),
          ),
        ],
        child: MaterialApp(
          debugShowCheckedModeBanner: false,
          navigatorKey: navigatorKey,
          title: 'Flutter Demo',
          theme: ThemeData(
            primarySwatch: Colors.blue,
          ),
          onGenerateRoute: (routeSettings) {
            WidgetBuilder builder = routes[routeSettings.name]!;

            return MaterialPageRoute(
              builder: (ctx) => builder(ctx),
              settings: routeSettings,
            );
          },
          builder: (context, child) {
            return BlocListener<AuthenticationBloc, AuthenticationState>(
              listenWhen: (previous, current) =>
                  previous.status != current.status,
              listener: (context, state) async {
                if (await widget.authRepository.checkUserFirstUsage()) {
                  log('is first usage');

                  navigatorKey.currentState!.pushAndRemoveUntil(
                      MaterialPageRoute(
                          builder: (context) => const OnBoardingOne()),
                      (route) => false);

                  widget.authRepository.changeFirstUsageValue();
                } else {
                  if (state is IsUnAuthenticated) {
                    log('user is UNAUTHENTICATED');

                    navigatorKey.currentState!.pushAndRemoveUntil(
                        MaterialPageRoute(builder: (context) => LoginPage()),
                        (route) => false);
                  }

                  if (state is IsAuthenticated) {
                    log('user is AUTHENTICATED');

                    navigatorKey.currentState!.pushAndRemoveUntil(
                        MaterialPageRoute(
                            builder: (context) => const PageSkeleton()),
                        (route) => false);
                  }
                }
              },
              child: child,
            );
          },
          initialRoute: SplashPage.navRoute,
          // home: const MyHomePage(title: 'Flutter Demo Home Page'),
        ),
      ),
    );
  }
}

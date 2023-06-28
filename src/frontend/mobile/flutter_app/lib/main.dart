import 'package:connectivity/connectivity.dart';
import 'package:fltter_app/app/app_bloc_observer.dart';
import 'package:fltter_app/common/logics/internet/internet_cubit.dart';
import 'package:fltter_app/common/views/onBoarding_one.dart';
import 'package:fltter_app/common/views/page_skeleton.dart';
import 'package:fltter_app/common/views/splash_page.dart';
import 'package:fltter_app/features/authentication/views/login_page.dart';
import 'package:fltter_app/features/home/logic/home_cubit.dart';
import 'package:fltter_app/features/profile/logic/profile_cubit.dart';
import 'package:fltter_app/repositories/auth_repository.dart';
import 'package:fltter_app/repositories/home_repository.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'common/configurations/routes.dart';
import 'common/logics/navigation/navigation_cubit.dart';
import 'features/authentication/logic/authentication/bloc/authentication_bloc.dart';
import 'features/authentication/logic/login/login_cubit.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  Bloc.observer = AppBlocObserver();

  runApp(MyApp(
    authRepository: AuthRepository(),
    internetCubit: InternetCubit(connectivity: Connectivity()),
    // homeRepository: HomeRepository(),
  ));
}

class MyApp extends StatefulWidget {
  const MyApp({
    super.key,
    required this.authRepository,
    required this.internetCubit,
    // required this.homeRepository,
  });

  final AuthRepository authRepository;
  final InternetCubit internetCubit;
  // final HomeRepository homeRepository;

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
          BlocProvider<InternetCubit>(
              create: (context) => widget.internetCubit),
          BlocProvider<LoginCubit>(
            create: (context) =>
                LoginCubit(authRepository: widget.authRepository),
          ),
          BlocProvider<NavigationCubit>(
            create: (context) => NavigationCubit(),
          ),
          BlocProvider<ProfileCubit>(
              create: (context) => ProfileCubit(
                  authRepository: widget.authRepository,
                  internetCubit: widget.internetCubit)),
          BlocProvider<HomeCubit>(
            create: (context) => HomeCubit(
                homeRepository:
                    HomeRepository(authRepository: widget.authRepository),
                internetCubit: widget.internetCubit),
          ),
        ],
        child: MaterialApp(
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
                  navigatorKey.currentState!.pushAndRemoveUntil(
                      MaterialPageRoute(
                          builder: (context) => const OnBoardingOne()),
                      (route) => false);

                  widget.authRepository.changeFirstUsageValue();
                } else {
                  if (state is IsUnAuthenticated) {
                    navigatorKey.currentState!.pushAndRemoveUntil(
                        MaterialPageRoute(builder: (context) => LoginPage()),
                        (route) => false);
                  }

                  if (state is IsAuthenticated) {
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

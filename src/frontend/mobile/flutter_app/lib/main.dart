import 'package:connectivity/connectivity.dart';
import 'package:fltter_app/app/app_bloc_observer.dart';
import 'package:fltter_app/common/logics/internet/internet_cubit.dart';
import 'package:fltter_app/common/logics/speech/speech_cubit.dart';
import 'package:fltter_app/common/services/pusher_service.dart';
import 'package:fltter_app/common/views/onBoarding_one.dart';
import 'package:fltter_app/common/views/page_skeleton.dart';
import 'package:fltter_app/common/views/splash_page.dart';
import 'package:fltter_app/features/authentication/views/login_page.dart';
import 'package:fltter_app/features/home/views/conseil_discipline_page.dart';
import 'package:fltter_app/features/home/views/convocation_page.dart';
import 'package:fltter_app/features/home/views/fautes_page.dart';
import 'package:fltter_app/features/home/views/sanctions_page.dart';
import 'package:fltter_app/features/profile/logic/profile_cubit.dart';
import 'package:fltter_app/repositories/auth_repository.dart';
import 'package:fltter_app/repositories/home_repository.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'common/configurations/routes.dart';
import 'common/logics/navigation/navigation_cubit.dart';
import 'common/services/notification_service.dart';
import 'features/authentication/logic/authentication/bloc/authentication_bloc.dart';
import 'features/authentication/logic/login/login_cubit.dart';
import 'features/home/logic/home_cubit.dart';

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

  @override
  void initState() {
    super.initState();

    NotificationService.initNotification(
      onNotificationClick: (NotificationResponse notificationResponse) {
        final payload = notificationResponse.payload;
        _handleOnClickNotification(payload!);
      },
    );
  }

  void _handleOnClickNotification(String paylaod) {
    switch (paylaod) {
      case 'faute':
        {
          navigatorKey.currentState!.push(
              MaterialPageRoute(builder: (context) => const FautesPage()));
        }
        break;
      case 'sanction':
        {
          navigatorKey.currentState!.push(
              MaterialPageRoute(builder: (context) => const SanctionsPage()));
        }
        break;
      case 'cd':
        {
          navigatorKey.currentState!.push(MaterialPageRoute(
              builder: (context) => const ConseilDisciplinePage()));
        }
        break;
      case 'convocation':
        {
          navigatorKey.currentState!.push(
              MaterialPageRoute(builder: (context) => const ConvocationPage()));
        }
        break;
      default:
    }
  }

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
                    internetCubit: widget.internetCubit,
                    // speechCubit: SpeechCubit(),
                  )),
          BlocProvider<HomeCubit>(
            create: (context) => HomeCubit(
                homeRepository:
                    // HomeRepository(authRepository: widget.authRepository),
                    HomeRepository(),
                internetCubit: widget.internetCubit),
          ),
          BlocProvider<SpeechCubit>(
            create: (context) => SpeechCubit(),
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
              // listenWhen: (previous, current) =>
              //     previous.status != current.status,
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
                        MaterialPageRoute(
                            builder: (context) => const LoginPage()),
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
        ),
      ),
    );
  }
}

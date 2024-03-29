import 'package:fltter_app/common/styles/colors.dart';
import 'package:fltter_app/common/utils/constants.dart';
import 'package:fltter_app/common/utils/helper.dart';
import 'package:fltter_app/common/views/page_skeleton.dart';
import 'package:fltter_app/common/widgets/common_widgets.dart';
import 'package:fltter_app/common/widgets/fields.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../common/utils/enums.dart';
import '../../../common/widgets/modals_and_animated_dialogs.dart';
import '../logic/login/login_cubit.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  bool showPassword = true;
  bool emailTap = false;
  bool passwordTap = false;

  late LoginCubit _loginCubit;

  @override
  void initState() {
    super.initState();
    _loginCubit = context.read<LoginCubit>();
  }

  @override
  Widget build(BuildContext context) {
    final List<Fields> loginFields = [
      Fields(
        fieldType: 'simpleInput',
        prefixIcon: Icon(Icons.email_outlined, color: appColors.black!),
        labelText: 'Email',
        hintText: 'Entrez votre username ...',
        controller: _loginCubit.email,
        emailTap: emailTap,
        onTapAction: () => setState(() {
          emailTap = true;
        }),
        validator: (email) {
          if (email!.isEmpty) {
            return 'Ce champ est requis...';
          }
          return null;
        },
      ),
      Fields(
        fieldType: 'passwordInput',
        hintText: "Entrez votre mot de passe ...",
        prefixIcon: IconButton(
          onPressed: () => setState(() {
            showPassword = !showPassword;
          }),
          icon: Icon(
            showPassword ? Icons.lock_open : Icons.lock_outline,
            color: appColors.black,
          ),
        ),
        labelText: 'Mot de passe',
        setObscureText: showPassword,
        controller: _loginCubit.password,
        passwordTap: passwordTap,
        onTapAction: () => setState(() {
          passwordTap = true;
        }),
        validator: (password) {
          if (password!.isEmpty) {
            return 'Ce champ est requis...';
          }
          if (password.length < 5) {
            return 'Le mot de passee doit avoir au moins cinq caracteres...';
          }
          return null;
        },
      ),
    ];

    return Scaffold(
      backgroundColor: appColors.primary,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 50),
            child: BlocListener<LoginCubit, LoginState>(
              listener: (context, state) {
                if (state.loginStatus == ApiStatus.failed) {
                  Modals.showScaffoldMessenger(
                      context: context,
                      content: state.statusMessage,
                      type: 'error');
                }
                if (state.loginStatus == ApiStatus.success) {
                  Modals.showScaffoldMessenger(
                      context: context,
                      content: state.statusMessage,
                      type: 'success');

                  Navigator.of(context).pushAndRemoveUntil(
                      MaterialPageRoute(
                          builder: (context) => const PageSkeleton()),
                      (route) => false);
                }
              },
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(
                      height: getHeight(50, context),
                    ),
                    Center(
                      child: Image.asset(
                        AppImages.onBoardingOne,
                        height: getHeight(200, context),
                        width: getWidth(200, context),
                      ),
                    ),
                    SizedBox(
                      height: getHeight(30, context),
                    ),
                    Text(
                      'Connexion',
                      style: TextStyle(
                          fontSize: getHeight(25, context),
                          fontWeight: FontWeight.bold,
                          color: appColors.black),
                    ),
                    SizedBox(
                      height: getHeight(10, context),
                    ),
                    Text(
                      'Connectez-vous pour continuer.',
                      style: TextStyle(
                          fontSize: getHeight(17, context),
                          color: appColors.black),
                    ),
                    SizedBox(
                      height: getHeight(40, context),
                    ),
                    // login fields part
                    Form(
                      key: _loginCubit.loginForm,
                      child: Column(
                        children: loginFields.map((field) {
                          return Padding(
                            padding:
                                EdgeInsets.only(top: getHeight(10, context)),
                            child: field,
                          );
                        }).toList(),
                      ),
                    ),

                    SizedBox(
                      height: getHeight(30, context),
                    ),
                    BlocBuilder<LoginCubit, LoginState>(
                      builder: (context, state) {
                        return Center(
                          child: Column(
                            children: [
                              CommonWidgets.commonButton(
                                press: () {
                                  FocusScope.of(context).unfocus();
                                  _loginCubit.checkIfFieldsAreEmpty();
                                },
                                text: 'Connexion',
                                color: appColors.secondary!,
                                roundedBorders: true,
                                context: context,
                              ),
                              SizedBox(
                                height: getWidth(10, context),
                              ),
                              state.loginStatus == ApiStatus.isLoading
                                  ? CircularProgressIndicator(
                                      strokeWidth: 2,
                                      color: appColors.secondary,
                                    )
                                  : const SizedBox()
                            ],
                          ),
                        );
                      },
                    ),
                    Center(
                      child: TextButton(
                        onPressed: () {},
                        child: Text(
                          'Mot de passe oublié ?',
                          style: TextStyle(
                              fontSize: getHeight(15, context),
                              fontWeight: FontWeight.bold,
                              color: appColors.secondary),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

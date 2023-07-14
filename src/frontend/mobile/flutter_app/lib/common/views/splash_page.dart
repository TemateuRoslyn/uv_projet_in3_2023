import 'package:fltter_app/common/styles/colors.dart';
import 'package:fltter_app/common/utils/helper.dart';
import 'package:flutter/material.dart';

import '../utils/constants.dart';

class SplashPage extends StatelessWidget {
  static const navRoute = 'splash-page';
  const SplashPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: appColors.primary,
        body: Center(
          child: Image.asset(
            AppImages.logo,
            height: getHeight(250, context),
            width: getWidth(250, context),
          ),
        ));
  }
}

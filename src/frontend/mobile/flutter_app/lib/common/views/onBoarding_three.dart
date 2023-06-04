import 'package:fltter_app/features/authentication/views/login_page.dart';
import 'package:flutter/material.dart';

import '../styles/colors.dart';
import '../utils/constants.dart';
import '../utils/helper.dart';
import '../widgets/common_widgets.dart';

class OnBoardingThree extends StatelessWidget {
  const OnBoardingThree({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: appColors.onBoardingThree,
      body: SafeArea(
          child: SingleChildScrollView(
        child: Column(
          // mainAxisSize: MainAxisSize.min,
          // mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            SizedBox(
              height: getHeight(60, context),
            ),
            Text(
              'Mark Home work\n   as completed',
              style: TextStyle(
                fontSize: getHeight(20, context),
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(
              height: getHeight(90, context),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 25),
              child: Image.asset(AppImages.onBoardingThree),
            ),
            SizedBox(
              height: getHeight(150, context),
            ),
            CommonWidgets.roundedNextButton(
              action: () => Navigator.pushAndRemoveUntil(
                  context,
                  MaterialPageRoute(builder: (context) => LoginPage()),
                  (route) => false),
              height: getHeight(50, context),
              width: getWidth(50, context),
              iconSize: getHeight(15, context),
              color: appColors.tinary!,
              iconColor: Colors.white,
              iconData: Icons.check,
            ),
          ],
        ),
      )),
    );
  }
}

// 

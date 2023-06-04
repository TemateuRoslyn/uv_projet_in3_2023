import 'package:fltter_app/features/authentication/views/register_page.dart';
import 'package:flutter/material.dart';

import '../styles/colors.dart';
import '../utils/constants.dart';
import '../utils/helper.dart';

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
            InkWell(
              onTap: () => Navigator.pushAndRemoveUntil(
                  context,
                  MaterialPageRoute(builder: (context) => const RegisterPage()),
                  (route) => false),
              child: Container(
                height: getHeight(50, context),
                width: getWidth(50, context),
                decoration: BoxDecoration(
                    color: appColors.tinary,
                    borderRadius: BorderRadius.circular(30.0)),
                alignment: Alignment.center,
                child: Icon(
                  Icons.check,
                  size: getHeight(15, context),
                  color: Colors.white,
                ),
              ),
            ),
          ],
        ),
      )),
    );
  }
}

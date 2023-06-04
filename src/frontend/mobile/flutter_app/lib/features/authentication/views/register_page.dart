import 'package:fltter_app/common/styles/colors.dart';
import 'package:flutter/material.dart';

import '../../../common/utils/helper.dart';

class RegisterPage extends StatelessWidget {
  const RegisterPage({super.key});

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;

    return Scaffold(
      backgroundColor: appColors.primary,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: [
              Text(
                'Inscrivez-vous',
                style: TextStyle(
                  fontSize: getHeight(20, context),
                  fontWeight: FontWeight.bold,
                ),
              ),
              Container(
                margin: EdgeInsets.only(top: getHeight(100, context)),
                width: double.infinity,
                height: getHeight((screenSize.height - 40), context),
                decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius:
                        BorderRadius.only(topRight: Radius.circular(40))),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

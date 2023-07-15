import 'package:fltter_app/common/styles/colors.dart';
import 'package:flutter/material.dart';

import '../../../common/utils/constants.dart';
import '../../../common/utils/helper.dart';

class HomeComponent extends StatelessWidget {
  const HomeComponent({
    super.key,
    required this.subtitle,
    required this.image,
    required this.onPressAction,
  });

  final String subtitle;
  final String image;
  final void Function()? onPressAction;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onPressAction,
      child: SizedBox(
        width: getWidth(100, context),
        child: Column(
          children: [
            CircleAvatar(
              backgroundColor: appColors.white!.withOpacity(0.4),
              radius: 30,
              child: Image.asset(
                image,
                width: getWidth(40, context),
                height: getHeight(40, context),
                // color: Colors.grey,
              ),
            ),
            SizedBox(
              height: getHeight(5, context),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10),
              child: Text(
                subtitle,
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: getHeight(15, context),
                  fontWeight: FontWeight.bold,
                  height: getHeight(1.5, context),
                  color: appColors.black!.withOpacity(0.7),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

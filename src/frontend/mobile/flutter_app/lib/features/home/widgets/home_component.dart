import 'package:flutter/material.dart';

import '../../../common/utils/constants.dart';
import '../../../common/utils/helper.dart';

class HomeComponent extends StatelessWidget {
  const HomeComponent({
    super.key,
    required this.subtitle,
    required this.onPressAction,
  });

  final String subtitle;
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
              backgroundColor: Colors.white,
              radius: 30,
              child: Image.asset(
                AppImages.logo,
                color: Colors.grey,
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
                  fontSize: getHeight(12, context),
                  height: getHeight(1.5, context),
                  color: Colors.white.withOpacity(0.7),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';

import '../../../common/styles/colors.dart';
import '../../../common/utils/constants.dart';
import '../../../common/utils/helper.dart';
import '../../../common/widgets/common_widgets.dart';

class CoursComponent extends StatelessWidget {
  const CoursComponent({
    super.key,
    this.onPressAction,
    required this.courseTitle,
    required this.teacherName,
    required this.imagePath,
    required this.currentUserType,
    this.color,
  });
  final String courseTitle;
  final String teacherName;
  final String? imagePath;
  final void Function()? onPressAction;
  final String currentUserType;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onPressAction,
      child: FittedBox(
        fit: BoxFit.contain,
        child: Container(
          margin: EdgeInsets.only(bottom: getHeight(25, context)),
          child: Row(
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(100),
                child: imagePath == null
                    ? Image.asset(
                        AppImages.unknownPersonImg,
                        height: getHeight(65, context),
                        width: getWidth(65, context),
                        // color: Colors.white,
                      )
                    : CommonWidgets.renderImage(
                        imagePath: imagePath!, context: context),
              ),
              SizedBox(
                width: getWidth(10, context),
              ),
              Container(
                // height: getHeight(100, context),
                width: getWidth(400, context),
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(15),
                    color: color ?? appColors.secondary!.withOpacity(0.4)),
                child: Padding(
                  padding: EdgeInsets.symmetric(
                      vertical: getWidth(10, context), horizontal: 25),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Text(
                        courseTitle,
                        // textAlign: TextAlign.center,
                        style: TextStyle(
                            fontSize: getHeight(20, context),
                            height: getHeight(1.5, context),
                            color: currentUserType == 'parents'
                                ? appColors.primary
                                : appColors.black,
                            fontWeight: FontWeight.bold),
                      ),
                      SizedBox(
                        height: getHeight(10, context),
                      ),
                      Text(
                        teacherName,
                        // textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: getHeight(18, context),
                          fontWeight: FontWeight.bold,
                          height: getHeight(1.5, context),
                          color: currentUserType == 'parents'
                              ? appColors.primary
                              : appColors.black,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// 
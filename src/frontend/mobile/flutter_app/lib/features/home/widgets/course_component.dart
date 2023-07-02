import 'package:flutter/material.dart';

import '../../../common/styles/colors.dart';
import '../../../common/utils/constants.dart';
import '../../../common/utils/helper.dart';

class CourseComponent extends StatelessWidget {
  const CourseComponent({
    super.key,
    this.onPressAction,
    required this.courseTitle,
    required this.teacherName,
    required this.currentUserType,
  });
  final String courseTitle;
  final String teacherName;
  final void Function()? onPressAction;
  final String currentUserType;

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
                child: Image.asset(
                  AppImages.unknownPersonImg,
                  height: getHeight(65, context),
                  width: getWidth(65, context),
                  // color: Colors.white,
                ),
              ),
              SizedBox(
                width: getWidth(10, context),
              ),
              Container(
                // height: getHeight(100, context),
                width: getWidth(400, context),
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(15),
                    color: currentUserType == 'parents'
                        ? appColors.tinary
                        : appColors.primary),
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
                            color: Colors.white,
                            fontWeight: FontWeight.bold),
                      ),
                      SizedBox(
                        height: getHeight(10, context),
                      ),
                      Text(
                        teacherName,
                        // textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: getHeight(15, context),
                          height: getHeight(1.5, context),
                          color: Colors.white.withOpacity(0.7),
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
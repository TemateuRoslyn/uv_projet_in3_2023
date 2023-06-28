import 'package:flutter/material.dart';

import '../../../common/styles/colors.dart';
import '../../../common/utils/constants.dart';
import '../../../common/utils/helper.dart';

class CourseComponent extends StatelessWidget {
  const CourseComponent(
      {super.key,
      required this.onPressAction,
      required this.courseTitle,
      required this.teacherName});
  final String courseTitle;
  final String teacherName;
  final void Function()? onPressAction;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {},
      child: FittedBox(
        fit: BoxFit.contain,
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: getWidth(20, context)),
          child: Row(
            children: [
              CircleAvatar(
                backgroundColor: Colors.white,
                radius: 60,
                child: Image.asset(
                  AppImages.logo,
                  color: Colors.grey,
                ),
              ),
              Container(
                padding: EdgeInsets.only(left: getWidth(25, context)),
                height: getHeight(100, context),
                width: getWidth(500, context),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(30),
                  color: appColors.tinary,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      courseTitle,
                      textAlign: TextAlign.left,
                      style: TextStyle(
                        fontSize: getHeight(30, context),
                        fontWeight: FontWeight.bold,
                        height: getHeight(2, context),
                        color: Colors.white,
                      ),
                    ),
                    Text(
                      teacherName,
                      textAlign: TextAlign.left,
                      style: TextStyle(
                        fontSize: getHeight(30, context),
                        height: getHeight(1.5, context),
                        color: Colors.white,
                      ),
                    ),
                  ],
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
import 'package:fltter_app/common/views/page_skeleton_two.dart';
import 'package:fltter_app/features/home/widgets/course_component.dart';
import 'package:flutter/material.dart';

import '../../../common/utils/helper.dart';

class Courses extends StatelessWidget {
  Courses({super.key});
  final List<Map<String, dynamic>> coursesComponents = [
    {
      'image': '',
      'courseTitle': 'BD',
      'teacherName': 'MAESTROS',
      'onPressAction': () {}
    },
    {
      'image': '',
      'courseTitle': 'ALGO',
      'teacherName': 'ROSE',
      'onPressAction': () {}
    },
    {
      'image': '',
      'courseTitle': 'PM',
      'teacherName': 'dskhfdfs',
      'onPressAction': () {}
    },
    {
      'image': '',
      'courseTitle': 'ARCHI',
      'teacherName': 'ghbdkdfdsf',
      'onPressAction': () {}
    },
    {
      'image': '',
      'courseTitle': 'RESEAU',
      'teacherName': 'fsdsdfdsfs',
      'onPressAction': () {}
    },
    {
      'image': '',
      'courseTitle': 'DATA ANALYSIS',
      'teacherName': 'LE DIEU SOCRATE DE TOUS LES TEMPS',
      'onPressAction': () {}
    },
    {
      'image': '',
      'courseTitle': 'ING APP WEB',
      'teacherName': 'fdsdfdfs',
      'onPressAction': () {}
    },
    {
      'image': '',
      'courseTitle': 'SI',
      'teacherName': 'dffjkhdskhds',
      'onPressAction': () {}
    },
    {
      'image': '',
      'courseTitle': 'SI',
      'teacherName': 'dffjkhdskhds',
      'onPressAction': () {}
    },
    {
      'image': '',
      'courseTitle': 'SI',
      'teacherName': 'dffjkhdskhds',
      'onPressAction': () {}
    },
    {
      'image': '',
      'courseTitle': 'SI',
      'teacherName': 'dffjkhdskhds',
      'onPressAction': () {}
    },
    {
      'image': '',
      'courseTitle': 'SI',
      'teacherName': 'dffjkhdskhds',
      'onPressAction': () {}
    },
  ];

  @override
  Widget build(BuildContext context) {
    return PageSkeletonTwo(
        headerText: 'Mes cours',
        body: Expanded(
          child: ListView(
              padding: EdgeInsets.only(
                  // bottom: getHeight(10, context),
                  top: getWidth(20, context),
                  left: getWidth(10, context),
                  right: getWidth(10, context)),
              children: coursesComponents
                  .map((coursesComponents) => CourseComponent(
                        currentUserType: 'eleves',
                        courseTitle: coursesComponents['courseTitle'],
                        teacherName: coursesComponents['teacherName'],
                        onPressAction: coursesComponents['onPressAction'],
                      ))
                  .toList()),
        ));
  }
}

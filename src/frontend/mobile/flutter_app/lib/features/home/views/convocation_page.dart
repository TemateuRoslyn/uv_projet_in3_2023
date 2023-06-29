import 'package:fltter_app/features/home/widgets/convocation_component.dart';
import 'package:flutter/material.dart';

import '../../../common/utils/helper.dart';

class Convocation extends StatelessWidget {
  Convocation({super.key});
  final List<Map<String, dynamic>> convocationsComponents = [
    {
      'libelle': 'Retard',
      'date': '12-05-2015',
      'start_at': '10:00',
      'end_at': '12:00',
      'statut': 'En cours',
      'onPressAction': () {}
    },
    {
      'libelle': 'Fraude',
      'date': '20-06-2023',
      'start_at': '09:30',
      'end_at': '12:00',
      'statut': 'Expire',
      'onPressAction': () {}
    },
    {
      'libelle': 'Absence',
      'date': '15-11-2020',
      'start_at': '08:30',
      'end_at': '15:30',
      'statut': 'En cours',
      'onPressAction': () {}
    },
    {
      'libelle': 'Absence non justifie',
      'date': '11-11-2011',
      'start_at': '7:00',
      'end_at': '15:00',
      'statut': 'Expire',
      'onPressAction': () {}
    },
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
              margin: EdgeInsets.symmetric(vertical: getHeight(30, context)),
              child: Wrap(
                  runSpacing: getHeight(20, context),
                  spacing: getWidth(50, context),
                  children: convocationsComponents
                      .map((convocationsComponents) => ConvocationComponent(
                            libelle: convocationsComponents['libelle'],
                            // date: convocationsComponents['date'],
                            subtitle1: convocationsComponents['start_at'],
                            subtitle2: convocationsComponents['end_at'],
                            statut: convocationsComponents['statut'],
                            isFrom: 'convocations',
                            // onPressAction:
                            //     convocationsComponents['onPressAction'],
                          ))
                      .toList()),
            )
          ],
        ),
      ),
    );
  }
}

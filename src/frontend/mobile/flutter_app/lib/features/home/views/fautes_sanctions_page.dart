import 'package:fltter_app/common/utils/helper.dart';
import 'package:fltter_app/common/views/page_skeleton_two.dart';
import 'package:fltter_app/features/home/widgets/fautes_et_sanctions_component.dart';
import 'package:flutter/material.dart';

class FautesEtSanctionsPage extends StatelessWidget {
  const FautesEtSanctionsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return PageSkeletonTwo(
        headerText: 'Mes fautes et sanctions',
        body: Expanded(
            child: ListView(
          padding: EdgeInsets.symmetric(
              vertical: getHeight(20, context),
              horizontal: getWidth(10, context)),
          children:
              List.generate(15, (index) => const FautesEtSanctionsComponent()),
        )));
  }
}

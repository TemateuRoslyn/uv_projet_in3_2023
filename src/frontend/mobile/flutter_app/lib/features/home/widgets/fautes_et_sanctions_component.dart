import 'package:flutter/material.dart';
import '../../../common/styles/colors.dart';
import '../../../common/utils/constants.dart';
import '../../../common/utils/helper.dart';

class FautesEtSanctionsComponent extends StatelessWidget {
  const FautesEtSanctionsComponent({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    final List<Map<String, dynamic>> cards = [
      {
        'text': 'Sanction ici',
        'middleCard': false,
      },
      {
        'text': 'Faute ici',
        'middleCard': true,
      },
      {
        'text': 'Penalité ici',
        'middleCard': false,
      },
    ];

    return Container(
      margin: EdgeInsets.only(
        bottom: getHeight(10, context),
      ),
      width: double.infinity,
      child: FittedBox(
        fit: BoxFit.contain,
        child: Row(
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(100),
              child: Image.asset(
                AppImages.unknownPersonImg,
                height: getHeight(45, context),
                width: getWidth(45, context),
                // color: Colors.white,
              ),
            ),
            ...List.generate(
                cards.length,
                (index) => ComponentCard(
                    text: cards[index]['text'],
                    middleCard: cards[index]['middleCard']))
          ],
        ),
      ),
    );
  }
}

class ComponentCard extends StatelessWidget {
  const ComponentCard({
    super.key,
    required this.text,
    required this.middleCard,
  });

  final String text;
  final bool middleCard;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: getHeight(70, context),
      width: getWidth(100, context),
      margin: EdgeInsets.only(left: getWidth(8, context)),
      decoration: BoxDecoration(
          color: middleCard ? appColors.secondary : appColors.primary,
          borderRadius: BorderRadius.circular(10)),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 10),
        child: Center(
          child: Text(
            text,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: getHeight(12, context),
              height: getHeight(1.5, context),
              fontWeight: middleCard ? FontWeight.bold : null,
              color: Colors.white,
            ),
          ),
        ),
      ),
    );
  }
}

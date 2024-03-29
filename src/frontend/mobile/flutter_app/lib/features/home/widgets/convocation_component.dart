import 'package:fltter_app/common/styles/colors.dart';
import 'package:fltter_app/common/utils/helper.dart';
import 'package:flutter/material.dart';

class ConvocationComponent extends StatelessWidget {
  const ConvocationComponent({
    super.key,
    required this.libelle,
    // required this.date,
    required this.subtitle1,
    this.subtitle2,
    this.statut,
    required this.isFrom,
    // required this.onPressAction,
  });

  final String libelle;
  // final String date;
  final String subtitle1;
  final String? subtitle2;
  final String? statut;
  final String isFrom;
  // final void Function()? onPressAction;

  @override
  Widget build(BuildContext context) {
    return Container(
      // height: getHeight(130, context),
      width: double.infinity,
      margin: EdgeInsets.only(bottom: getHeight(20, context)),
      padding: EdgeInsets.symmetric(
          horizontal: getWidth(20, context), vertical: getHeight(15, context)),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: appColors.secondary!.withOpacity(0.5),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            libelle,
            // textAlign: TextAlign.left,
            style: TextStyle(
              fontSize: getHeight(17, context),
              fontWeight: FontWeight.bold,
              color:
                  isFrom == 'convocations' ? appColors.black : appColors.black,
            ),
          ),
          SizedBox(
            height: getHeight(10, context),
          ),
          if (isFrom == 'convocations') ...[
            Row(
              children: [
                Icon(
                  Icons.date_range_rounded,
                  color: appColors.black!.withOpacity(0.8),
                  size: getHeight(20, context),
                ),
                SizedBox(
                  width: getWidth(10, context),
                ),
                SizedBox(
                  width: getWidth(270, context),
                  child: Text(
                    // DateFormat('dd-MM-yyyy').format(DateTime.now()),
                    subtitle1,
                    style: TextStyle(
                      fontSize: getHeight(20, context),
                      fontWeight: FontWeight.bold,
                      color: appColors.primary,
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(
              height: getHeight(10, context),
            ),
            Row(
              children: [
                Icon(
                  Icons.date_range_rounded,
                  color: appColors.black!.withOpacity(0.8),
                  size: getHeight(20, context),
                ),
                SizedBox(
                  width: getWidth(10, context),
                ),
                SizedBox(
                  width: getWidth(270, context),
                  child: Text(
                    // DateFormat('dd-MM-yyyy').format(DateTime.now()),
                    subtitle2!,
                    style: TextStyle(
                      fontSize: getHeight(20, context),
                      fontWeight: FontWeight.bold,
                      color: appColors.primary,
                    ),
                  ),
                ),
              ],
            ),
          ],
          if (isFrom != 'convocations') ...[
            Text(
              // DateFormat('dd-MM-yyyy').format(DateTime.now()),
              subtitle1,
              style: TextStyle(
                fontSize: getHeight(15, context),
                fontWeight: FontWeight.bold,
                color: appColors.black,
              ),
            ),
          ],
          SizedBox(
            height: getHeight(10, context),
          ),
          if (statut != null)
            Container(
              padding: EdgeInsets.symmetric(
                  horizontal: getWidth(10, context),
                  vertical: getHeight(5, context)),
              width: getWidth(130, context),
              // height: getHeight(20, context),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                color: isFrom == 'convocations'
                    ? appColors.secondary
                    : appColors.secondary,
              ),
              alignment: Alignment.center,
              child: Text(
                statut!,
                textAlign: TextAlign.center,
                style: TextStyle(
                    color: appColors.primary,
                    fontSize: getHeight(15, context),
                    fontWeight: FontWeight.bold),
              ),
            ),
        ],
      ),
    );
  }
}

//
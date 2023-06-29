import 'dart:ui';

import 'package:fltter_app/common/styles/colors.dart';
import 'package:fltter_app/common/utils/helper.dart';
import 'package:flutter/material.dart';
import '../../../common/styles/colors.dart';
import 'package:intl/intl.dart';

class ConvocationComponent extends StatelessWidget {
  const ConvocationComponent({
    super.key,
    required this.libelle,
    required this.date,
    required this.start_at,
    required this.end_at,
    required this.statut,
    required this.onPressAction,
  });

  final String libelle;
  final String date;
  final String start_at;
  final String end_at;
  final String statut;
  final void Function()? onPressAction;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        InkWell(
          onTap: () {},
          child: FittedBox(
            fit: BoxFit.contain,
            child: Row(
              children: [
                Column(
                  children: [
                    Padding(
                      padding: EdgeInsets.symmetric(
                          horizontal: getWidth(20, context)),
                      child: Row(
                        children: [
                          Container(
                            padding: EdgeInsets.only(
                                left: getWidth(22, context),
                                right: getWidth(22, context)),
                            height: getHeight(130, context),
                            width: getWidth(335, context),
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(30),
                              color: appColors.tinary,
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Text(
                                      libelle,
                                      textAlign: TextAlign.left,
                                      style: TextStyle(
                                        fontSize: getHeight(25, context),
                                        fontWeight: FontWeight.bold,
                                        height: getHeight(2, context),
                                        color: Colors.white,
                                      ),
                                    ),
                                  ],
                                ),
                                Column(
                                  children: [
                                    Row(
                                      children: [
                                        Icon(
                                          Icons.date_range_rounded,
                                          color: appColors.white,
                                        ),
                                        Container(
                                          margin: EdgeInsets.only(
                                              left: getWidth(10, context)),
                                          child: Text(
                                            DateFormat('dd-MM-yyyy')
                                                .format(DateTime.now()),
                                            textAlign: TextAlign.left,
                                            style: TextStyle(
                                              fontSize:
                                                  getHeight(18.5, context),
                                              height: getHeight(1.5, context),
                                              color: Colors.white,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                                SizedBox(
                                  height: getHeight(2, context),
                                ),
                                Column(
                                  children: [
                                    Row(
                                      children: [
                                        Icon(
                                          Icons.access_time,
                                          color: appColors.white,
                                        ),
                                        Container(
                                          margin: EdgeInsets.only(
                                              left: getWidth(10, context)),
                                          child: Text(
                                            DateFormat('HH:mm')
                                                .format(DateTime.now()),
                                            textAlign: TextAlign.left,
                                            style: TextStyle(
                                              fontSize: getHeight(15, context),
                                              height: getHeight(1.5, context),
                                              color: Colors.white,
                                            ),
                                          ),
                                        ),
                                        Container(
                                          margin: EdgeInsets.symmetric(
                                            horizontal: getWidth(5, context),
                                          ),
                                          child: Text(
                                            '-',
                                            style: TextStyle(
                                              color: appColors.white,
                                              fontSize: getHeight(15, context),
                                            ),
                                          ),
                                        ),
                                        Text(
                                          DateFormat('HH:mm')
                                              .format(DateTime.now()),
                                          textAlign: TextAlign.left,
                                          style: TextStyle(
                                            fontSize: getHeight(15, context),
                                            height: getHeight(1.5, context),
                                            color: Colors.white,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                                SizedBox(
                                  height: getHeight(4, context),
                                ),
                                Container(
                                  width: getWidth(90, context),
                                  height: getHeight(30, context),
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(20),
                                    color: Colors.green,
                                  ),
                                  child: Center(
                                    child: Text(
                                      statut,
                                      textAlign: TextAlign.center,
                                      style: TextStyle(
                                        color: Colors.white,
                                        fontSize: getWidth(15, context),
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

//
import 'package:fltter_app/common/styles/colors.dart';
import 'package:fltter_app/common/views/check_internet_page.dart';
import 'package:fltter_app/common/views/page_skeleton_two.dart';
import 'package:fltter_app/features/home/logic/home_cubit.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter/material.dart';

import '../../../common/models/user.dart';
import '../../../common/utils/enums.dart';
import '../../../common/utils/helper.dart';
import '../../../common/widgets/common_widgets.dart';
import '../widgets/convocation_component.dart';

class SanctionsPage extends StatefulWidget {
  const SanctionsPage({
    super.key,
    this.childInfos,
  });

  final User? childInfos;

  @override
  State<SanctionsPage> createState() => _SanctionsPageState();
}

class _SanctionsPageState extends State<SanctionsPage> {
  late HomeCubit _homeCubit;

  @override
  void initState() {
    super.initState();

    _homeCubit = context.read<HomeCubit>();
    if (widget.childInfos == null) {
      _homeCubit.getDataByType(dataType: 'sanctions');
    } else {
      _homeCubit.getDataByType(
          dataType: 'sanctions', childId: widget.childInfos!.id);
    }
  }

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;

    return PageSkeletonTwo(
      headerText: 'Mes sanctions',
      body: BlocBuilder<HomeCubit, HomeState>(
        buildWhen: (previous, current) =>
            (previous.sanctionStatus != current.sanctionStatus ||
                previous.sanctions != current.sanctions),
        builder: (context, state) {
          return CheckInternetConnectionPage(
            positionFromTop: (screenSize.height / 2),
            errorTextColor: appColors.primary!,
            body: state.sanctionStatus == ApiStatus.isLoading
                ? CommonWidgets.circularProgressIndicatorWidget(
                    positionFromTop: (screenSize.height / 2),
                    context: context,
                    color: appColors.primary!)
                : state.sanctionStatus == ApiStatus.failed
                    ? CommonWidgets.failedStatusWidget(
                        positionFromTop: (screenSize.height / 2),
                        context: context,
                        statusMessage: state.sanctionStatusMessage,
                        color: appColors.primary!,
                        reloadFunction: () {
                          if (widget.childInfos == null) {
                            _homeCubit.getDataByType(dataType: 'sanctions');
                          } else {
                            _homeCubit.getDataByType(
                                dataType: 'sanctions',
                                childId: widget.childInfos!.id);
                          }
                        })
                    : state.sanctions.isEmpty
                        ? CommonWidgets.noDataWidget(
                            positionFromTop: (screenSize.height / 2),
                            context: context,
                            color: appColors.primary!)
                        : Expanded(
                            child: ListView(
                            padding: EdgeInsets.only(
                                top: getHeight(20, context),
                                left: getWidth(10, context),
                                right: getWidth(10, context)),
                            children: state.sanctions
                                .map((sanction) => ConvocationComponent(
                                      libelle: 'Sanction: ${sanction.libelle}',
                                      subtitle1:
                                          'Durée: ${sanction.dureeValidite}',
                                      statut: 'Gravité: Grave',
                                      isFrom: 'sanctions',
                                      // onPressAction: () {},
                                    ))
                                .toList(),
                          )),
          );
        },
      ),
    );
  }
}

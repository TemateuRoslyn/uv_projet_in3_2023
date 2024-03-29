import 'package:fltter_app/common/utils/helper.dart';
import 'package:fltter_app/common/views/check_internet_page.dart';
import 'package:fltter_app/common/views/page_skeleton_two.dart';
import 'package:fltter_app/features/home/logic/home_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../common/models/user.dart';
import '../../../common/styles/colors.dart';
import '../../../common/utils/enums.dart';
import '../../../common/widgets/common_widgets.dart';
import '../widgets/convocation_component.dart';

class FautesPage extends StatefulWidget {
  const FautesPage({super.key, this.childInfos});

  final User? childInfos;

  @override
  State<FautesPage> createState() => _FautesPageState();
}

class _FautesPageState extends State<FautesPage> {
  late HomeCubit _homeCubit;

  @override
  void initState() {
    super.initState();

    _homeCubit = context.read<HomeCubit>();
    if (widget.childInfos == null) {
      _homeCubit.getDataByType(dataType: 'fautes');
    } else {
      _homeCubit.getDataByType(
          dataType: 'fautes', childId: widget.childInfos!.id);
    }
  }

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;

    return PageSkeletonTwo(
        headerText: 'Mes fautes',
        body: BlocBuilder<HomeCubit, HomeState>(
          buildWhen: (previous, current) =>
              (previous.fauteStatus != current.fauteStatus ||
                  previous.fautes != current.fautes),
          builder: (context, state) {
            return CheckInternetConnectionPage(
              helper: state.fautes.isEmpty ? 0 : 1,
              positionFromTop: (screenSize.height / 2),
              errorTextColor: appColors.black!,
              body: state.fauteStatus == ApiStatus.isLoading
                  ? CommonWidgets.circularProgressIndicatorWidget(
                      positionFromTop: (screenSize.height / 2),
                      context: context,
                      color: appColors.white!)
                  : state.fauteStatus == ApiStatus.failed
                      ? CommonWidgets.failedStatusWidget(
                          positionFromTop: (screenSize.height / 2),
                          context: context,
                          statusMessage: state.fauteStatusMessage,
                          color: appColors.black!,
                          reloadFunction: () {
                            if (widget.childInfos == null) {
                              _homeCubit.getDataByType(dataType: 'fautes');
                            } else {
                              _homeCubit.getDataByType(
                                  dataType: 'fautes',
                                  childId: widget.childInfos!.id);
                            }
                          })
                      : state.fautes.isEmpty
                          ? CommonWidgets.noDataWidget(
                              positionFromTop: (screenSize.height / 2),
                              context: context,
                              color: appColors.black!)
                          : Expanded(
                              child: ListView(
                              padding: EdgeInsets.only(
                                  top: getHeight(20, context),
                                  left: getWidth(10, context),
                                  right: getWidth(10, context)),
                              children: state.fautes
                                  .map((faute) => ConvocationComponent(
                                        libelle: 'Faute: ${faute.libelle}',
                                        subtitle1:
                                            'Règle: ${faute.regle.libelle}',
                                        statut: 'Gravité: ${faute.gravite}',
                                        isFrom: 'fautes_santions',
                                        // onPressAction: () {},
                                      ))
                                  .toList(),
                            )),
            );
          },
        ));
  }
}

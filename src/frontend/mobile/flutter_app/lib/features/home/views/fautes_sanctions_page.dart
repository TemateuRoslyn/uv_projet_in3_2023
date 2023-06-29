import 'package:fltter_app/common/utils/helper.dart';
import 'package:fltter_app/common/views/check_internet_page.dart';
import 'package:fltter_app/common/views/page_skeleton_two.dart';
import 'package:fltter_app/features/home/logic/home_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../common/styles/colors.dart';
import '../../../common/utils/enums.dart';
import '../../../common/widgets/common_widgets.dart';
import '../widgets/convocation_component.dart';

class FautesEtSanctionsPage extends StatefulWidget {
  const FautesEtSanctionsPage({super.key});

  @override
  State<FautesEtSanctionsPage> createState() => _FautesEtSanctionsPageState();
}

class _FautesEtSanctionsPageState extends State<FautesEtSanctionsPage> {
  late HomeCubit _homeCubit;

  @override
  void initState() {
    super.initState();

    _homeCubit = context.read<HomeCubit>();
    _homeCubit.getDataByType('fautes');
  }

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;

    return PageSkeletonTwo(
        headerText: 'Mes fautes et sanctions',
        body: BlocBuilder<HomeCubit, HomeState>(
          builder: (context, state) {
            return CheckInternetConnectionPage(
              helper: state.fautes.isEmpty ? 0 : 1,
              positionFromTop: (screenSize.height / 2),
              errorTextColor: appColors.primary!,
              body: state.fauteStatus == ApiStatus.isLoading
                  ? CommonWidgets.circularProgressIndicatorWidget(
                      positionFromTop: (screenSize.height / 2),
                      context: context,
                      color: appColors.primary!)
                  : state.fauteStatus == ApiStatus.failed
                      ? CommonWidgets.loadingStatusFailedWidget(
                          positionFromTop: (screenSize.height / 2),
                          context: context,
                          statusMessage: state.riStatusMessage,
                          color: appColors.primary!,
                          reloadFunction: () =>
                              _homeCubit.getDataByType('fautes'))
                      : Expanded(
                          child: ListView(
                          padding: EdgeInsets.only(
                              top: getHeight(20, context),
                              left: getWidth(10, context),
                              right: getWidth(10, context)),
                          children: List.generate(
                              15,
                              (index) => const ConvocationComponent(
                                    libelle: 'Faute: libelle',
                                    // date: 'date',
                                    subtitle1: 'Règle: start_at',
                                    subtitle2: 'Règlement interieur: end_at',
                                    statut: 'Gravité',
                                    isFrom: 'fautes_santions',
                                    // onPressAction: () {},
                                  )),
                        )),
            );
          },
        ));
  }
}

import 'package:fltter_app/common/views/page_skeleton.dart';
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  bool profileIsSelected = true;
  bool modifyProfileIsSelected = false;

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text('Home page...'),
    );
  }
}

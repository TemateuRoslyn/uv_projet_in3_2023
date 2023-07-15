import 'package:bloc/bloc.dart';
import 'package:fltter_app/common/utils/enums.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'speech_state.dart';
part 'speech_cubit.freezed.dart';

class SpeechCubit extends Cubit<SpeechState> {
  SpeechCubit() : super(SpeechState());

  final FlutterTts _flutterTts = FlutterTts();

  void startSpeeching(String textToSpeech) async {
    emit(state.copyWith(speechType: SpeechType.isSpeeching));
    await _flutterTts.setLanguage('fr-FR');
    await _flutterTts.setPitch(1.0);
    await _flutterTts.setVolume(1.0);
    // _flutterTts.setProgressHandler((text, start, end, word) {
    //   print('word is $word');
    //   print('end is $end');
    // });
    _flutterTts.setCompletionHandler(() {
      emit(state.copyWith(speechType: SpeechType.speechClosed));
    });

    await _flutterTts.speak(textToSpeech);
  }

  void stopSpeeching() async {
    await _flutterTts.stop();
    emit(state.copyWith(speechType: SpeechType.speechClosed));
  }

  void pauseSpeech() async {
    await _flutterTts.pause();
    emit(state.copyWith(speechType: SpeechType.speechPaused));
  }
}

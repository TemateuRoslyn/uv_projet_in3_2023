import 'package:flutter_tts/flutter_tts.dart';

class TextToSpeech {
  static final FlutterTts _flutterTts = FlutterTts();

  static void initTextToSpeech() async {
    await _flutterTts.setLanguage('fr-FR');
    await _flutterTts.setPitch(1.0);
    await _flutterTts.speak(
        'De tout temps, l\'homme a tenté de comprendre puis de reproduire l\'extraordinaire machine qu\'est l\'être humain. Les premiers automates nous font sourire aujourd\'hui. Les premiers ordinateurs également, mais un peu moins. Et lorsqu\'un certain McCullogn, aidé de Pitts, invente en 1943 le premier neurone formel, on ne rigole plus. L\'ordinateur est devenu capable de reproduire des neurones artificiels. Le "complexe de Frankenstein" va alors freiner les recherches. On commence à entendre parler du concept d\'Intelligence Artificielle, plus connu sous les termes d\'IA. Cela fait peur.');
  }

  static Future<void> stopSpeeching() async {
    await _flutterTts.stop();
  }
}

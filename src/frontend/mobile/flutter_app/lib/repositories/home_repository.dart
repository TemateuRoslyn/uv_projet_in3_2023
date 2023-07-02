// ignore_for_file: unused_local_variable

import 'package:fltter_app/common/configurations/api_configuration.dart';
import 'package:fltter_app/common/models/convocation.dart';
import 'package:fltter_app/common/models/reglement_interieur.dart';
import 'package:fltter_app/repositories/auth_repository.dart';

import '../common/models/conseil_discipline.dart';
import '../common/models/faute.dart';
import '../common/models/suggestion.dart';

class HomeRepository {
  // HomeRepository({
  //   required this.authRepository,
  // }) {}

  // final AuthRepository authRepository;

  final dio = ApiConfiguration.dioClient;

  Future<List<ReglementInterieur>> getAllReglementInterieur() async {
    try {
      final response = await dio.get(
        'reglement/findAll',
        options: ApiConfiguration.getAuthorizationOptions(
            AuthRepository.getUserToken),
      );
      final List<ReglementInterieur> riData = [];

      final data = response.data!['content'] as List;
      for (var ri in data) {
        riData.add(ReglementInterieur.fromJson(ri));
      }

      return riData;
    } catch (e) {
      rethrow;
    }
  }

  Future<List<Faute>> getAllUserFautes() async {
    try {
      final response = await dio.get(
        'fautes/findAll/eleve/${AuthRepository.getUserId}',
        options: ApiConfiguration.getAuthorizationOptions(
            AuthRepository.getUserToken),
      );
      final List<Faute> fautes = [];

      final fautesData = response.data!['content'] as List;
      for (var faute in fautesData) {
        fautes.add(Faute.fromJson(faute));
      }

      return fautes;
    } catch (e) {
      rethrow;
    }
  }

  Future<List<ConseilDiscipline>> getAllUserCD() async {
    try {
      final response = await dio.get(
        'conseil_discipline/findAll/eleve/${AuthRepository.getUserId}',
        options: ApiConfiguration.getAuthorizationOptions(
            AuthRepository.getUserToken),
      );
      final List<ConseilDiscipline> cds = [];

      final cdData = response.data!['content'] as List;
      for (var cd in cdData) {
        cds.add(ConseilDiscipline.fromJson(cd));
      }

      return cds;
    } catch (e) {
      rethrow;
    }
  }

  Future<List<Convocation>> getAllUserConvocations() async {
    try {
      final response = await dio.get(
        'convocation/findAll/eleve/${AuthRepository.getUserId}',
        options: ApiConfiguration.getAuthorizationOptions(
            AuthRepository.getUserToken),
      );
      final List<Convocation> convocations = [];

      final convocationsData = response.data!['content'] as List;
      for (var convocation in convocationsData) {
        convocations.add(Convocation.fromJson(convocation));
      }

      return convocations;
    } catch (e) {
      rethrow;
    }
  }

  Future<void> insertSuggestion(String suggestion) async {
    try {
      final response = await dio.post(
        '/suggestion/create',
        data: {'description': suggestion},
        options: ApiConfiguration.getAuthorizationOptions(
          AuthRepository.getUserToken,
        ),
      );
      // Gérer la réponse ou effectuer des actions supplémentaires si nécessaire
    } catch (e) {
      rethrow;
    }
  }
}

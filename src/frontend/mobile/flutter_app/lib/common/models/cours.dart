import 'package:fltter_app/common/models/user.dart';

class Cours {
  final int id;
  final String libelle;
  final String dateCours;
  final String heureDebut;
  final String heureFin;
  final User professeur;
  final String createdAt;
  final String updatedAt;

  Cours({
    required this.id,
    required this.libelle,
    required this.dateCours,
    required this.heureDebut,
    required this.heureFin,
    required this.professeur,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Cours.fromJson(Map<String, dynamic> json) => Cours(
        id: json['id'],
        libelle: json['libelle'],
        dateCours: json['date_cour'],
        heureDebut: json['heure_debut'],
        heureFin: json['heure_fin'],
        professeur: User.fromJson(json['professeur']),
        createdAt: json['created_at'],
        updatedAt: json['updated_at'],
      );
}

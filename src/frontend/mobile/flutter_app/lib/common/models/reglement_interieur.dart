class ReglementInterieur {
  final int id;
  final String libelle;
  final String createdAt;
  final String updatedAt;

  ReglementInterieur({
    required this.id,
    required this.libelle,
    required this.createdAt,
    required this.updatedAt,
  });

  factory ReglementInterieur.fromJson(Map<String, dynamic> json) =>
      ReglementInterieur(
          id: json['id'],
          libelle: json['libelle'],
          createdAt: json['created_at'],
          updatedAt: json['updated_at']);
}

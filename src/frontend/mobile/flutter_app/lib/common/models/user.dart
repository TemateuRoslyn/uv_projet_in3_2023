class User {
  final int id;
  final int? solvable;
  final int? redoublant;
  final String firstName;
  final String lastName;
  final String? profession;
  final String? email;
  final String dateDeNaissance;
  final String lieuDeNaissance;
  final String? photo;
  final String sexe;
  final String telephone;
  final int? userId;
  final Map<String, dynamic>? classe;
  final List<User>? eleves;
  final String? createdAt;
  final String? updatedAt;

  User({
    required this.id,
    this.solvable,
    this.redoublant,
    required this.firstName,
    required this.lastName,
    this.profession,
    this.email,
    required this.dateDeNaissance,
    required this.lieuDeNaissance,
    this.photo,
    required this.sexe,
    required this.telephone,
    this.userId,
    this.classe,
    this.eleves,
    this.createdAt,
    this.updatedAt,
  });

  User copyWith({
    int? id,
    int? solvable,
    int? redoublant,
    String? firstName,
    String? lastName,
    String? profession,
    String? email,
    String? dateDeNaissance,
    String? lieuDeNaissance,
    String? photo,
    String? sexe,
    String? telephone,
    int? userId,
    Map<String, dynamic>? classe,
    List<User>? eleves,
    String? createdAt,
    String? updatedAt,
  }) =>
      User(
          id: id ?? this.id,
          solvable: solvable ?? this.solvable,
          redoublant: redoublant ?? this.redoublant,
          firstName: firstName ?? this.firstName,
          lastName: lastName ?? this.lastName,
          profession: profession ?? this.profession,
          email: email ?? this.email,
          dateDeNaissance: dateDeNaissance ?? this.dateDeNaissance,
          lieuDeNaissance: lieuDeNaissance ?? this.lieuDeNaissance,
          photo: photo ?? this.photo,
          sexe: sexe ?? this.sexe,
          telephone: telephone ?? this.telephone,
          userId: userId ?? this.userId,
          classe: classe ?? this.classe,
          eleves: eleves ?? this.eleves,
          createdAt: createdAt ?? this.createdAt,
          updatedAt: updatedAt ?? this.updatedAt);

  factory User.fromJson(Map<String, dynamic> json) {
    List<User> eleves = [];
    if (json['eleves'] != null) {
      final elevesData = json['eleves'] as List;
      for (var data in elevesData) {
        eleves.add(User.fromJson(data));
      }
    }

    return User(
        id: json['id'],
        solvable: json['solvable'],
        redoublant: json['redoublant'],
        firstName: json['firstName'],
        lastName: json['lastName'],
        profession: json['profession'],
        email: json['email'],
        dateDeNaissance: json['dateDeNaissance'],
        lieuDeNaissance: json['lieuDeNaissance'],
        photo: json['photo'],
        sexe: json['sexe'],
        telephone: json['telephone'],
        userId: json['userId'],
        classe: json['classe'],
        eleves: eleves,
        createdAt: json['created_at'],
        updatedAt: json['updated_at']);
  }
}

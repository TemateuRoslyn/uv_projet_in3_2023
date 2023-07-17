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
  final List<Map<String, dynamic>>? childrenAndThierClasses;
  final Map<String, dynamic>? classe;
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
    this.childrenAndThierClasses,
    this.classe,
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
    List<Map<String, dynamic>>? childrenAndThierClasses,
    Map<String, dynamic>? classe,
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
          childrenAndThierClasses:
              childrenAndThierClasses ?? this.childrenAndThierClasses,
          classe: classe ?? this.classe,
          createdAt: createdAt ?? this.createdAt,
          updatedAt: updatedAt ?? this.updatedAt);

  factory User.fromJson(Map<String, dynamic> json) {
    List<Map<String, dynamic>> children = [];

    if (json['eleves'] != null) {
      final childData = json['eleves'] as List;
      for (var data in childData) {
        final childData = User.fromJson(data);
        final hisClass = data['classe'];
        final childAndHisClass = {
          'child': childData,
          'hisClass': hisClass,
          'nbreFautes': data['nombresFautes'],
        };

        children.add(childAndHisClass);
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
        childrenAndThierClasses: children,
        classe: json['classe'],
        createdAt: json['created_at'],
        updatedAt: json['updated_at']);
  }
}

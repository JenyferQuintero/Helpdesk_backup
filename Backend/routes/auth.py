from flask import Blueprint, request, jsonify
from database import get_db_connection

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["POST"])
def Login():
    # Verificación de credenciales
    data = request.get_json()
    user = data.get("usuario")
    password = data.get("contraseña")

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT * FROM usuarios WHERE usuario = %s AND contraseña = %s", (user, password)
        )

        # Usar fetchall() para obtener todos los resultados de una vez
        usuarios = cursor.fetchall()

        if usuarios:
            return jsonify({"mensaje": "Inicio de sesión exitoso"}), 200
        

        return jsonify({"error": "Credenciales inválidas"}), 401

    finally:
        cursor.close()
        conn.close()
import { View, Text } from "react-native";
import styles from "../styles/telainicial.styles";

export default function DicasClima({ clima }) {
    if (!clima) return null;

    const main = clima.weather[0]?.main.toLowerCase();
    const temp = clima.main.temp;
    const vento = clima.wind.speed;
    const umidade = clima.main.humidity;
    let dicas = [];

if (main.includes("rain") || main.includes("chuva")) {
    dicas = [
    "🌧️ Leve guarda-chuva!",
    "⚡ Evite áreas alagadas",
    "🚗 Redobre atenção no trânsito",
    `💧 Umidade: ${umidade}%`,
    `💨 Vento: ${vento} m/s`,
    "☔ Verifique previsão de chuva frequente"
];
} else if (main.includes("storm") || main.includes("tempestade")) {
    dicas = [
    "⛈️ Fique em local seguro",
    "🔌 Desligue aparelhos eletrônicos",
    "🌳 Afaste-se de árvores e postes",
    `💧 Umidade: ${umidade}%`,
    `💨 Vento forte: ${vento} m/s`,
    "⚠️ Possíveis rajadas fortes"
];
} else if (main.includes("flood") || main.includes("alagamento")) {
    dicas = [
    "💧 Evite transitar por ruas alagadas",
    "🆘 Procure abrigo elevado",
    "📞 Ligue 199 em emergência",
    `💧 Umidade: ${umidade}%`,
    "🚫 Evite dirigir em áreas alagadas"
];
} else if (temp >= 32) {
    dicas = [
    "☀️ Use protetor solar",
    "💧 Beba muita água",
    "🧢 Use roupas leves",
    "🚫 Evite exposição prolongada ao sol",
    `🌡️ Temperatura: ${temp}°C`,
    `💨 Vento: ${vento} m/s`
];
} else if (temp <= 14) {
    dicas = [
    "🧣 Use roupas quentes",
    "☕ Tome bebidas quentes",
    "❄️ Evite mudanças bruscas de temperatura",
    `🌡️ Temperatura: ${temp}°C`,
    `💧 Umidade: ${umidade}%`
    ];
} else {
    dicas = [
    "✅ Aproveite o dia!",
    "🔔 Fique atento às atualizações",
    `🌡️ Temperatura: ${temp}°C`,
    `💨 Vento: ${vento} m/s`,
    `💧 Umidade: ${umidade}%`
    ];
}

return (
    <View style={styles.cardDicas}>
    <Text style={styles.dicasTitulo}>Dicas de hoje:</Text>
    {dicas.map((dica, idx) => (
        <View style={styles.dicaItem} key={idx}>
        <Text style={styles.dicaTxt}>{dica}</Text>
        </View>
    ))}
    </View>
);
}

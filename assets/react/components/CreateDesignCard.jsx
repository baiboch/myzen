export default function CreateDesignCard() {
    return (
        <a href="/admin/designer" className="admin__create-card">
            <div className="admin__create-card-inner">
                <span className="admin__create-card-badge">✦ AI-конструктор</span>
                <h2 className="admin__create-card-title">
                    Создать дизайн <span>с помощью ИИ</span>
                </h2>
                <p className="admin__create-card-text">
                    Слева — чат с нейросетью, справа — живой конструктор страницы.
                    Опишите идею словами, уточняйте правки в диалоге.
                </p>
                <span className="admin__create-card-btn">Открыть конструктор →</span>
            </div>
        </a>
    );
}

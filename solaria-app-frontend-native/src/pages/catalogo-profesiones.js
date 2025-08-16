import { profesionesService } from "../services/catalogo-profesiones-api";
import table from "../components/table";

export default function CatalogoProfesiones(){
    return  (
        <div class="container mx-auto px-2 py-6">
            <div class="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                {
                    profesionesService.getAll().then(profesiones => {
                        renderProfesionesTable(profesiones);
                    }).catch(error => {
                        console.error("Error fetching profesiones:", error);
                    })
                }
            </div>
        </div>
    );
}

function renderProfesionesTable(profesiones){
    return table({
        header: TABLE_HEADERS,
        objects: profesiones,
        columnOrder: TABLE_ORDER,
        tableName: "Catálogo de Profesiones"
    })
}

const TABLE_HEADERS = ['ID','NOMBRE PROFESIÓN'];
const TABLE_ORDER = ['id','nombre'];
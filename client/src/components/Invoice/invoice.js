import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import {
	Table,
	TableHeader,
	TableCell,
	TableBody,
	DataTableCell,
} from "@david.kucsai/react-pdf-table";

const Invoice = ({ order }) => (
	<Document>
		<Page>
			<Text>order invoice</Text>
		</Page>
	</Document>
);
export default Invoice;

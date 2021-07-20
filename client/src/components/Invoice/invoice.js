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
		<Page style={styles.body}>
			<Text style={styles.header} fixed>
				~ {new Date().toLocaleString()} ~
			</Text>
			<Text style={styles.title}>Order Invoice</Text>
			<Text style={styles.author}>MERN App</Text>
			<Text style={styles.subtitle}>Order Summary</Text>
			{/* <Text>{JSON.stringify(order)}</Text>
			<Text>{JSON.stringify(order.products)}</Text> */}
			<Table>
				<TableHeader>
					<TableCell>Title</TableCell>
					<TableCell>Price</TableCell>
					<TableCell>Quantity</TableCell>
					<TableCell>Color</TableCell>
					<TableCell>Shipping</TableCell>
				</TableHeader>
			</Table>
			<Table data={order.products}>
				<TableBody>
					<DataTableCell getContent={(p) => <Text> {p.product.title}</Text>} />
					<DataTableCell getContent={(p) => <Text> {p.product.price}</Text>} />
					<DataTableCell
						getContent={(p) => <Text> {p.product.quantity}</Text>}
					/>
					<DataTableCell getContent={(p) => <Text> {p.product.color}</Text>} />
					<DataTableCell
						getContent={(p) => <Text> {p.product.shipping}</Text>}
					/>
				</TableBody>
			</Table>
			<Text style={styles.title}>Payment Invoice</Text>
			<Text style={styles.subtitle}>Order Invoice</Text>
			<Text>Amount : {order.paymentIntent.amount}</Text>
			<Text>Status : {order.paymentIntent.status}</Text>
			<Text>
				Paid at : {new Date(order.paymentIntent.created).toLocaleString()}
			</Text>
			<Text style={styles.footer}>~Thanks For shopping with us ~</Text>
		</Page>
	</Document>
);

const styles = StyleSheet.create({
	body: {
		paddingTop: 35,
		paddingBottom: 65,
		paddingHorizontal: 35,
	},
	title: {
		fontSize: 24,
		textAlign: "center",
	},
	author: {
		fontSize: 12,
		textAlign: "center",
		marginBottom: 40,
	},
	subtitle: {
		fontSize: 18,
		margin: 12,
	},
	text: {
		margin: 12,
		fontSize: 14,
		textAlign: "justify",
	},
	image: {
		marginVertical: 15,
		marginHorizontal: 100,
	},
	header: {
		fontSize: 12,
		marginBottom: 20,
		textAlign: "center",
		color: "grey",
	},
	footer: {
		padding: "100px",
		fontSize: 12,
		marginBottom: 20,
		textAlign: "center",
		color: "grey",
	},
	pageNumber: {
		position: "absolute",
		fontSize: 12,
		bottom: 30,
		left: 0,
		right: 0,
		textAlign: "center",
		color: "grey",
	},
});
export default Invoice;

import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { Table, Popconfirm, Divider, DatePicker, Select } from "antd";
//
import LayoutPage from "components/admin/LayoutPage";
import { DefaultStyles } from "components/admin/layout/AdminGlobalStyle";
import AdminIcon from "@/dashkit/Icon";
import AdminBadge from "@/dashkit/Badges";
import PageHeader from "@/dashkit/PageHeader";
import { HorizontalList, ListItem, ListItemSize } from "@/diginext/layout/ListLayout";
import AdminButton, { ButtonSize, ButtonType } from "@/dashkit/Buttons";
import BlockSplitter from "@/diginext/elements/BlockSplitter";
import Card from "@/diginext/containers/Card";
import { InputSelect } from "@/diginext/form/Form";
import { showError, checkPermission, showSuccess } from "@/helpers/helpers";
import ApiCall from "modules/ApiCall";
import { getServerSideProps as TrackingUserSession } from "plugins/next-session/admin";
import moment from "moment";
import CONFIG from "web.config";

const { Option } = Select;

export const getServerSideProps = TrackingUserSession;

const AdminProvincePage = ({ user, children }) => {
	const router = useRouter();
	const formSearchRef = useRef({});
	const [formSearchInput, setFormSearchInput] = useState({});
	const [myTimeout, setMyTimeout] = useState();
	const [tableData, setTableData] = useState([]);
	const [pagination, setPagination] = useState({});
	const [sorter, setSorter] = useState({});
	const [filter, setFilter] = useState();
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [selectionType, setSelectionType] = useState("checkbox");
	const [zoneProvinceData, SetZoneProvinceData] = useState([]);
	const defaultLabelProvince = "Province";
	//Const
	const [provinceValue, setProvinceValue] = React.useState(defaultLabelProvince);
	const onchangeProvince = (key) => {
		setProvinceValue(key);
	};
	//Permissions
	const canList = checkPermission(user, "zone_province_list");
	const canCreate = checkPermission(user, "zone_province_add");
	const canEdit = checkPermission(user, "zone_province_edit");
	const canDetail = checkPermission(user, "zone_province_detail");
	const canDelete = checkPermission(user, "zone_province_delete");
	//
	const dateFormat = "YYYY-MM-DD";

	//Init load
	useEffect(function () {
		if (!canList) {
			router.push("/admin");
		} else {
			fetchList();
			fetchListZoneProvince();
		}
	}, []);

	//Methods
	const fetchListZoneProvince = async function () {
		let params = {
			router,
			path: `/api/v1/admin/zone-provinces?get=true`,
			token: user.token,
		};
		let res = await ApiCall(params);
		if (!res.status) return showError(res);
		let list = res.data;
		SetZoneProvinceData(list);
	};

	const fetchList = async function (pagination = null, filters = null, sorter = null) {
		let limit = pagination == null ? 10 : pagination.pageSize;
		let page = pagination == null ? 1 : pagination.current;
		let orderBy = sorter != null && typeof sorter["field"] != "undefined" ? sorter.field : "sortOrder";
		let order = sorter == null ? -1 : sorter.order == "ascend" ? 1 : -1;
		let filtera = typeof filters == "string" ? filters : filter;
		let params = {
			router,
			path: `/api/v1/admin/zone-provinces?page=${page}&limit=${limit}&orderBy=${orderBy}&order=${order}&${filtera}`,
			token: user.token,
		};
		let res = await ApiCall(params);
		if (!res.status) return showError(res);
		let list = res.data.list;
		let paginator = res.data.paginator;
		setTableData(list);
		setPagination({
			current: paginator.currentPage,
			pageSize: paginator.limit,
			pageSizeOptions: [10, 20, 50],
			showSizeChanger: true,
			showTitle: true,
			total: paginator.total,
		});
		setSorter({
			field: orderBy,
			order: order,
		});
		setFilter(filtera);
	};

	const handleSearch = function (isRest = false, isExport = false) {
		if (isRest) {
			setProvinceValue(defaultLabelProvince);
			formSearchRef.current.active.value = "";
			setFormSearchInput({
				...formSearchInput,
				createdFrom: "",
				createdTo: "",
			});
		}
		let currentFilter = "";
		let currentFormSearch = {
			idIn: isRest || provinceValue === defaultLabelProvince ? "" : provinceValue,
			active: isRest || !formSearchRef.current.active.value ? "" : formSearchRef.current.active.value.value,
			createdFrom: !isRest ? formSearchInput.createdFrom || "" : "",
			createdTo: !isRest ? formSearchInput.createdTo || "" : "",
		};

		Object.keys(currentFormSearch).forEach(function (index) {
			currentFilter += `${index}=${currentFormSearch[index]}&`;
		});

		if (isExport) {
			let exportUrl = `${CONFIG.NEXT_PUBLIC_API_BASE_PATH}/api/v1/admin/zone-provinces?get=true&export=true&${currentFilter}&token=${user.token}`;
			window.location.href = exportUrl;
			return;
		}

		clearTimeout(myTimeout);
		let loginTimeout = setTimeout(async function () {
			fetchList(pagination, currentFilter, sorter);
		}, 1000);
		setMyTimeout(loginTimeout);
	};

	const handleDeleteMany = function (id = null) {
		let ids = [];
		if (id) {
			ids.push(id);
		} else {
			ids = selectedRowKeys;
		}
		ApiCall({
			router,
			path: `/api/v1/admin/zone-provinces`,
			method: "DELETE",
			token: user.token,
			data: {
				ids: selectedRowKeys.length ? selectedRowKeys : [id],
			},
		}).then((res) => {
			if (res.status) {
				showSuccess(res);
				fetchList(pagination, filter, sorter);
				if (!id) {
					setSelectedRowKeys([]);
				}
			} else {
				showError(res);
			}
		});
	};

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			sorter: true,
			sortDirections: ["ascend", "descend"],
			width: "20%",
			render: function renderName(name, row, index) {
				return name.vi;
			},
		},
		{
			title: "Sort Order",
			dataIndex: "sortOrder",
			sorter: true,
			sortDirections: ["ascend", "descend"],
			width: "20%",
			render: (sortOrder, row, index) => {
				return sortOrder;
			},
		},
		{
			title: "Status",
			dataIndex: "active",
			sorter: true,
			sortDirections: ["ascend", "descend"],
			render: function renderStatus(active) {
				return (
					<AdminBadge size={ButtonSize.SMALL} type={active ? ButtonType.SUCCESS : ButtonType.SECONDARY}>
						{active ? "Active" : "Disabled"}
					</AdminBadge>
				);
			},
		},
		{
			title: "Created At",
			dataIndex: "createdAt",
			sorter: true,
			sortDirections: ["ascend", "descend"],
		},
		{
			title: "Actions",
			dataIndex: "actions",
			render: function renderActions(text, row) {
				return (
					<>
						<AdminButton
							onClick={() => router.push(`/admin/zones/provinces/edit/${row.id}`)}
							size={ButtonSize.SMALL}
							style={{ marginRight: "5px", display: !canDetail ? "none" : "" }}
						>
							<AdminIcon name="edit" width={14} />
						</AdminButton>
						<Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteMany(row.id)}>
							<AdminButton
								type={ButtonType.DANGER}
								size={ButtonSize.SMALL}
								style={{ marginRight: "5px", display: !canDelete ? "none" : "" }}
							>
								<AdminIcon name="delete" width={14} />
							</AdminButton>
						</Popconfirm>
					</>
				);
			},
		},
	];

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			setSelectedRowKeys(selectedRowKeys);
		},
	};

	const createBtn = (
		<React.Fragment>
			{canDelete ? (
				<AdminButton onClick={() => handleDeleteMany(null)} style={{ margin: "2px" }} type={ButtonType.DANGER}>
					Delete
				</AdminButton>
			) : (
				""
			)}
			{canCreate ? <AdminButton href="/admin/zones/provinces/create">Create</AdminButton> : ""}
		</React.Fragment>
	);

	const header = (
		<PageHeader pretitle="admin" title={`Province (${pagination.total || 0})`} button={createBtn} separator={true}>
			List
		</PageHeader>
	);

	return (
		<LayoutPage header={header} user={user}>
			<BlockSplitter height={25} />
			<Divider orientation="left">Filter</Divider>
			<HorizontalList itemSize={ListItemSize.STRETCH}>
				<ListItem style={{ marginRight: "1rem", width: "50%" }}>
					<label style={{ marginBottom: "15px" }}>Province</label>
					<Select
						showSearch
						optionFilterProp="children"
						filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
						value={provinceValue}
						onChange={onchangeProvince}
					>
						{zoneProvinceData.map((province) => (
							<Option key={province.id}>{province.name.vi}</Option>
						))}
					</Select>
				</ListItem>
				<ListItem style={{ marginRight: "1rem" }}>
					<InputSelect
						ref={(el) => (formSearchRef.current.active = el)}
						label={<label style={{ display: "inline-block" }}>Status</label>}
						labelInValue
						defaultValue={{ value: "", label: "None" }}
					>
						<Select.Option value="">None</Select.Option>
						<Select.Option value={true}>Active</Select.Option>
						<Select.Option value={false}>Disabled</Select.Option>
					</InputSelect>
				</ListItem>
			</HorizontalList>
			<HorizontalList itemSize={ListItemSize.STRETCH}>
				<ListItem style={{ marginRight: "1rem" }}>
					<label>From-To</label> <br />
					<DatePicker
						style={{ marginTop: "5px" }}
						size="large"
						value={formSearchInput.createdFrom ? moment(formSearchInput.createdFrom, dateFormat) : ""}
						format={dateFormat}
						onChange={(date, dateString) =>
							setFormSearchInput({
								...formSearchInput,
								createdFrom: dateString,
							})
						}
					/>
					<DatePicker
						style={{ marginTop: "5px" }}
						size="large"
						value={formSearchInput.createdTo ? moment(formSearchInput.createdTo, dateFormat) : ""}
						format={dateFormat}
						onChange={(date, dateString) =>
							setFormSearchInput({
								...formSearchInput,
								createdTo: dateString,
							})
						}
					/>
				</ListItem>
			</HorizontalList>
			<AdminButton onClick={(e) => handleSearch(false)} style={{ margin: "2px" }} type={ButtonType.INFO}>
				Search
			</AdminButton>
			<AdminButton onClick={(e) => handleSearch(true)} style={{ margin: "2px" }} type={ButtonType.SECONDARY}>
				Reset
			</AdminButton>
			<AdminButton onClick={(e) => handleSearch(false, true)} style={{ margin: "2px" }} type={ButtonType.WARNING}>
				Export
			</AdminButton>
			<BlockSplitter />
			<BlockSplitter height={25} />
			<Card>
				<Table
					rowKey={(item) => item.id}
					rowSelection={{
						type: selectionType,
						...rowSelection,
					}}
					columns={columns}
					dataSource={tableData}
					scroll={{ x: DefaultStyles.container.maxWidthMD }}
					pagination={pagination}
					onChange={fetchList}
				/>
			</Card>
			<BlockSplitter />
		</LayoutPage>
	);
};

export default AdminProvincePage;

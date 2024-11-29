import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ListControllerComponent } from 'src/app/base/components/list-controller.component';
import { Global } from 'src/app/base/services/global';
import { HttpxService } from 'src/app/base/services/httpx.service';

import { SendComponent } from '../send/send.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent extends ListControllerComponent implements OnInit {

	public records: any;
	public addCompanyUrl: string = 'affiliate-transactions/add';
	public pageOptions = Global.pageOptions();
	public msgModal: any;

	public commonError: string = "";

	constructor(
		private httpx: HttpxService,
		private dialog: MatDialog,
		private location: Location
	) {
		super(location, httpx);
	}
	// Row identifier
	public rowId: string = "";
	public search: string = "";
	public affiliateId: string = "1";
	public requestId: string = "1";

	public sort: any = { name: "name", order: "ASC" };

	override ngOnInit(): void {
		super.ngOnInit()
		this.refreshList(this.pageOptions.pageEvents);
	}
	handlePageEvent(event: PageEvent) {
		this.refreshList(event);
	}
	refreshList(event: PageEvent) {
		let params = '&pageIndex=' + event.pageIndex + '&pageSize=' + event.pageSize + '&sort=' + this.sort.name + '&order=' + this.sort.order;

		this.httpx.get(Global.api('affiliate-requests/' + this.affiliateId + '?search=' + this.search + params)).subscribe((data: any) => {
			this.records = data.data;
			this.pageOptions.pageEvents.length = data.recordsFiltered;
		})
	}

	onSearch(data: any) {
		this.search = data;
		this.refreshList(this.pageOptions.pageEvents);
	}
	onSort(a: any) {
		this.sort = a;
		this.refreshList(this.pageOptions.pageEvents);
	}
	onSendChips(requestId: number) {

		let that = this;
		let send = this.dialog.open(SendComponent, {

			data: {}

		});
		send.afterClosed().subscribe(result => {
			if (result.action == "1") {
				let data = {
					'affiliate_id': this.affiliateId,
					'request_id': requestId,
					'chips': result.chips,
				};
				this.httpx.post(Global.api('affiliate-transaction-send/' + that.affiliateId), data).subscribe((resultRet: any) => {
					if (resultRet.status == 'OK') {
						let msg = "Your account credited with " + result.chips + " chip(s)";
						this.msgModal = msg;
						this.refreshList(this.pageOptions.pageEvents);

					}
					else {
						this.commonError = resultRet.error.messages;
					}

				},
					(error: any) => {
						this.commonError = error.error.messages;

					}
				);
			}
		});
	}
}
